from django.contrib import admin
from .models import Item, Tag, Category, CustomUser

admin.site.register(CustomUser)

admin.site.register(Item)
admin.site.register(Tag)
admin.site.register(Category)