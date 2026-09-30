import { useProjectSelection } from "@/context/useProjectSelection";
import { useCustomDomainQuery } from "@/hooks/queries/useConfigurationQueries";

// When a custom subdomain is active it becomes the link base URL.
export function useLinkHostname(): string | undefined {
  const { selectedProject } = useProjectSelection();
  const { data: customDomain } = useCustomDomainQuery(selectedProject?.id);
  if (customDomain?.status === "active") return customDomain.hostname;
  return selectedProject?.domain;
}
