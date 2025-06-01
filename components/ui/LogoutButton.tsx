'use client';

import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export function LogoutButton() {
  const supabase = createClientComponentClient();
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.refresh(); // updates client session
  };

  return (
    <button onClick={handleLogout} className="text-sm underline text-red-600">
      Log out
    </button>
  );
}