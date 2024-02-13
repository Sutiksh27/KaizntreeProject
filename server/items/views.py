from rest_framework import generics
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from django_filters.rest_framework import DjangoFilterBackend 
from django.utils import timezone
from django.core.mail import send_mail
from django.conf import settings
from .models import Tag, Item, Category, CustomUser, PasswordResetToken
from .serializers import CategorySerializer, TagSerializer, ItemSerializer, CustomUserSerializer, PasswordResetTokenSerializer
import secrets

# Views for Items
class ItemListCreateView(generics.ListCreateAPIView):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
    filter_backends = [SearchFilter, OrderingFilter, DjangoFilterBackend]
    search_fields = ['name', 'sku', 'category__name', 'tags']
    ordering_fields = ['name', 'sku', 'category__name', 'stock_quantity']

class ItemDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer

# Views for Categories
class CategoryListCreateView(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class CategoryDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

# Views for Tags
class TagListCreateView(generics.ListCreateAPIView):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer

class TagDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer


# Views for User
class CustomUserCreateView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [AllowAny]
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

# @api_view(['GET'])
class CustomUserListView(generics.ListAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [IsAuthenticated]


# View for Login
class CustomUserLoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        password = request.data.get('password')
        print("Email: ", email, "Password: ", password)
        user = authenticate(request, email=email, password=password)

        if user:
            # Generate JWT tokens (you may need to customize this based on your authentication system)
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)

            # Serialize user data (you may customize this serializer)
            serializer = CustomUserSerializer(user)

            # Return a response with tokens and user data
            return Response({
                'access_token': access_token,
                'user': serializer.data
            }, status=status.HTTP_200_OK)
        else:
            # If authentication fails, return an error response
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

# class CustomUserLoginView(ObtainAuthToken):
#     permission_classes = [AllowAny]

#     def post(self, request, *args, **kwargs):
#         serializer = self.serializer_class(data=request.data, context={'request': request})
#         serializer.is_valid(raise_exception=True)
#         user = serializer.validated_data['user']
#         token, created = Token.objects.get_or_create(user=user)
#         return Response({'token': token.key, 'user_id': user.pk, 'email': user.email})

class CustomUserLogoutView(APIView):
    def post(self, request, *args, **kwargs):
        request.auth.delete()  # Invalidate the token
        return Response({'detail': 'Successfully logged out'}, status=status.HTTP_200_OK)

# Views for Password Reset

class ForgotPasswordView(APIView):
    def post(self, request):
        email = request.data.get('email')

        try:
            user = CustomUser.objects.get(email=email)
        except CustomUser.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

        # Generate and save password reset token
        token = generate_unique_token()
        expired_at = timezone.now() + timezone.timedelta(days=1)
        reset_token = PasswordResetToken(user=user, token=token, expired_at=expired_at)
        reset_token.save()

        # Send email with reset link
        reset_link = f'{settings.FRONTEND_URL}/reset-password/{token}'  # Update with your frontend reset password page URL
        send_mail(
            'Password Reset',
            f'Click the link to reset your password: {reset_link}',
            settings.DEFAULT_FROM_EMAIL,
            [email],
            fail_silently=False,
        )

        return Response({'message': 'Password reset link sent successfully'}, status=status.HTTP_200_OK)
    

class ResetPasswordView(generics.GenericAPIView):
    serializer_class = PasswordResetTokenSerializer

    def post(self, request, token):
        # Check if the token is valid and not expired
        try:
            reset_token = PasswordResetToken.objects.get(token=token, expired_at__gt=timezone.now())
        except PasswordResetToken.DoesNotExist:
            return Response({'error': 'Invalid or expired token'}, status=status.HTTP_400_BAD_REQUEST)

        # Update the user's password (assuming you have a serializer for updating the password)
        serializer = self.get_serializer(reset_token.user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            reset_token.delete()
            return Response({'message': 'Password reset successfully'}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Invalid data'}, status=status.HTTP_400_BAD_REQUEST)

# Helper function to generate a unique token
def generate_unique_token(length=32):
    # Your implementation for generating a unique token
    # This could be a random string, a UUID, or any other method
    # Make sure to check that the generated token is unique in the database
    return secrets.token_hex(length)