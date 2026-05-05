import os
import django
import sys

# Add the project directory to sys.path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# Set up Django environment
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
django.setup()

from accounts.models import User, RoleChoice

def populate_users():
    roles = [
        RoleChoice.USER,
        RoleChoice.EMPLOYEE,
        RoleChoice.MANAGER,
        RoleChoice.ADMIN_SUPER,
        RoleChoice.ADMIN_EDITOR,
        RoleChoice.ADMIN_SUPPORT
    ]
    
    password = "password"
    
    for role in roles:
        print(f"Creating users for role: {role}")
        for i in range(1, 5):
            email = f"{role.lower()}{i}@example.com"
            first_name = f"{role.capitalize()}"
            last_name = f"User{i}"
            
            # Check if user already exists
            user, created = User.objects.get_or_create(
                email=email,
                defaults={
                    'first_name': first_name,
                    'last_name': last_name,
                    'role': role,
                }
            )
            
            if created:
                user.set_password(password)
                # If it's a superuser role, set is_superuser and is_staff
                if role == RoleChoice.ADMIN_SUPER:
                    user.is_superuser = True
                    user.is_staff = True
                elif role in [RoleChoice.ADMIN_EDITOR, RoleChoice.ADMIN_SUPPORT, RoleChoice.MANAGER]:
                    user.is_staff = True
                
                user.save()
                print(f"  Created user: {email}")
            else:
                print(f"  User {email} already exists")

if __name__ == "__main__":
    populate_users()
    print("Population complete!")
