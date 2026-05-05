import os
import uuid

def imageUploadHelper(instance, filename):
    """
    Generates a unique file path for uploaded files.
    Example: staffs/avatars/550e8400-e29b-41d4-a716-446655440000.jpg
    """
    ext = filename.split('.')[-1]
    filename = f"{uuid.uuid4()}.{ext}"
    
    # instance._meta.model_name will be 'staff'
    model_name = instance._meta.model_name
    
    return os.path.join(f"{model_name}s", "avatars", filename)
