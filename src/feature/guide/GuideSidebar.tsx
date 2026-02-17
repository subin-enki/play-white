import { ChevronRight } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarRail,
} from '@/ui/sidebar';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@radix-ui/react-collapsible';
import { guideConfig } from './guideConfig';

export function GuideSidebar() {
  const { categorySlug, pageSlug } = useParams();

  return (
    <Sidebar className='top-14! h-[calc(100svh-3.5rem)]! min-w-60'>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild size='lg'>
              <Link to='/guide'>
                <div className='flex flex-col gap-0.5 leading-none'>
                  <span className='font-semibold'>White Editor</span>
                  <span className='text-xs'>Developer Guide</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Documentation</SidebarGroupLabel>
          <SidebarMenu>
            {guideConfig.map((category) => {
              const isCategoryActive = category.id === categorySlug;
              const isSinglePage = category.pages.length === 1;

              if (isSinglePage) {
                const page = category.pages[0];
                const isActive = isCategoryActive && page.slug === pageSlug;
                return (
                  <SidebarMenuItem key={category.id}>
                    <SidebarMenuButton asChild isActive={isActive}>
                      <Link to={`/guide/${category.id}/${page.slug}`}>{category.label}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              }

              return (
                <Collapsible key={category.id} defaultOpen className='group/collapsible'>
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton>
                        <ChevronRight className='transition-transform group-data-[state=open]/collapsible:rotate-90' />
                        {category.label}
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {category.pages.map((page) => {
                          const isActive = isCategoryActive && page.slug === pageSlug;
                          return (
                            <SidebarMenuSubItem key={page.slug}>
                              <SidebarMenuSubButton asChild isActive={isActive}>
                                <Link to={`/guide/${category.id}/${page.slug}`}>{page.label}</Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          );
                        })}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
