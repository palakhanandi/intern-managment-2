import { useState } from "react";
import { useAuth } from "@/AuthContext";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export default function Logout() {
  const { logout } = useAuth(); // 🔥 use Keycloak logout
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    setOpen(false);
    logout(); // 🔥 this logs out from Keycloak
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="w-full justify-start text-muted-foreground hover:text-foreground"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Logout</DialogTitle>
          <DialogDescription>
            Are you sure you want to log out of your account?
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-end gap-3 mt-6">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>

          <Button variant="destructive" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}