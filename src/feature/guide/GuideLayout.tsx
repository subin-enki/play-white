import { Outlet } from 'react-router-dom';
import { GuideSidebar } from './GuideSidebar';
import { useIsMobile } from '@/hooks/useMobile';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/ui/sidebar';

export function GuideLayout() {
  const isMobile = useIsMobile();

  return (
    <SidebarProvider>
      <GuideSidebar />
      <SidebarInset className='pt-10'>
        {isMobile && (
          <header className='mt-6 flex h-14 items-center gap-2 border-b px-4'>
            <SidebarTrigger />
          </header>
        )}
        <main className='min-w-0 flex-1 px-10 py-3 md:py-8'>
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
