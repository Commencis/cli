import { TEMPLATE_IDS } from '@/constants';

export function validateTemplate(template?: string): boolean | string {
  if (!template) {
    return false;
  }
  return (TEMPLATE_IDS as string[]).includes(template);
}
