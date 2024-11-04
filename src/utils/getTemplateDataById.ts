import { TemplateData, TemplateId } from '@/types';

import { TEMPLATE_DATA } from '@/constants';

export function getTemplateDataById(id: TemplateId): TemplateData {
  const templateData = Object.values(TEMPLATE_DATA).find(
    (template) => template.id === id
  ) as TemplateData;

  return templateData;
}
