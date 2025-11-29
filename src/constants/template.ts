import { templateConfigMap } from '@/config';
import type { TemplateId } from '@/types';

export const TEMPLATE_IDS: TemplateId[] = Object.keys(
  templateConfigMap
) as TemplateId[];
