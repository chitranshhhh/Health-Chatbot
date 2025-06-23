import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

export default function Profile() {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: ''
  });

  const handleUpdate = async () => {
    try {
      // Here you would make an API call to update the user profile
      toast({
        title: "Profile Updated",
        description: "Your changes have been saved successfully."
      });
      setIsEditing(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Update failed",
        description: "Please try again later"
      });
    }
  };

  return (
    <div className="min-h-screen pt-20">
      <div className="page-container max-w-2xl">
        <div className="glass-card p-6 rounded-xl">
          <h1 className="text-2xl font-bold mb-6">Profile Settings</h1>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Name</label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                disabled={!isEditing}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <Input
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                disabled={!isEditing}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Phone</label>
              <Input
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                disabled={!isEditing}
              />
            </div>

            <div className="flex gap-4">
              {isEditing ? (
                <>
                  <Button onClick={handleUpdate}>Save Changes</Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </Button>
                </>
              ) : (
                <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
              )}
            </div>

            <div className="pt-6 border-t">
              <Button 
                variant="destructive" 
                onClick={logout}
              >
                Log Out
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}