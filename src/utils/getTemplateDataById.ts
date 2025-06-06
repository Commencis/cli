import { templateConfigMap, TemplateData } from '@/config';
import { ExtensionId, TemplateId } from '@/types';

import packageJson from '../../package.json' with { type: 'json' };

export function getTemplateDataById(
  id: TemplateId | ExtensionId
): TemplateData {
  const templateConfig = templateConfigMap[id];
  const version = packageJson.templateDependencies[templateConfig.name];

  return { ...templateConfig, version };
}
