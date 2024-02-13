from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.utils import timezone

class Category(models.Model):
    class CategoryChoices(models.TextChoices):
        RAW_MATERIALS = 'Raw Materials', 'Raw Materials'
        FINISHED_PRODUCTS = 'Finished Products', 'Finished Products'
        BUNDLES = 'Bundles', 'Bundles'
    
    name = models.CharField(
        max_length=20,
        choices = CategoryChoices.choices,
        default = CategoryChoices.RAW_MATERIALS
    )

    def __str__(self):
        return self.name
    
class Tag(models.Model):
    name = models.CharField(max_length = 50)
    icon = models.ImageField(upload_to="tag_icons/", null=True,blank=True)

    def __str__(self):
        return self.name

class Item(models.Model):
    sku = models.CharField(max_length = 50, unique = True)
    name = models.CharField(max_length = 100)
    tags = models.ManyToManyField(Tag)
    category = models.ForeignKey(Category, on_delete = models.CASCADE)
    stockStatus = models.PositiveIntegerField(default = 0)
    availableStock = models.PositiveIntegerField(default = 0)

class CustomUserManager(BaseUserManager):
    def create_user(self, username, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(username=username, email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')
        
        return self.create_user(username, email, password, **extra_fields)

class CustomUser(AbstractBaseUser):
    username = models.CharField(max_length=30, unique=True)
    email = models.EmailField(unique=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.email
    
    def has_perm(self, perm, obj=None):
        return self.is_superuser

    def has_module_perms(self, app_label):
        return self.is_superuser
    

class PasswordResetToken(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    token = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    expired_at = models.DateTimeField()