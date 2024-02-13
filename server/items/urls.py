from django.urls import path
from django.contrib import admin
from items import views

baseUrl = "api/v1/"

urlpatterns = [
    # URL for admin
    path(baseUrl + 'admin/', admin.site.urls),
    # URLs for Items
    path(baseUrl + 'items/', views.ItemListCreateView.as_view(), name='item-list-create'),
    path(baseUrl + 'items/<int:pk>/', views.ItemDetailView.as_view(), name='item-detail'),

    # URLs for Categories
    path(baseUrl + 'categories/', views.CategoryListCreateView.as_view(), name='category-list-create'),
    path(baseUrl + 'categories/<int:pk>/', views.CategoryDetailView.as_view(), name='category-detail'),

    # URLs for Tags
    path(baseUrl + 'tags/', views.TagListCreateView.as_view(), name='tag-list-create'),
    path(baseUrl + 'tags/<int:pk>/', views.TagDetailView.as_view(), name='tag-detail'),

    # URLs for Users
    path(baseUrl + 'users/create/', views.CustomUserCreateView.as_view(), name='user-create'),
    path(baseUrl + 'users/', views.CustomUserListView.as_view(), name='user-list-view'),

    # URLs for Login/Logout
    path(baseUrl + 'login/', views.CustomUserLoginView.as_view(), name='login'),
    path(baseUrl + 'logout/', views.CustomUserLogoutView.as_view(), name='logout'),

    # URL for initiating the password reset process
    path(baseUrl + 'forgot-password/', views.ForgotPasswordView.as_view(), name='forgot-password'),

    # URL for resetting the password using the token
    path(baseUrl + 'reset-password/<str:token>/', views.ResetPasswordView.as_view(), name='reset-password'),
]
