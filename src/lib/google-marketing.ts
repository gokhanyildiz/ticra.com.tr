function readEnv(name: string) {
  const value = process.env[name]?.trim();

  return value || undefined;
}

export function getGoogleMarketingConfig() {
  const gtmId = readEnv('GTM_CONTAINER_ID');
  const gaId = readEnv('GA4_MEASUREMENT_ID');

  return {
    gtmId,
    // GA4 should be configured inside GTM when a GTM container is active.
    standaloneGaId: gtmId ? undefined : gaId,
  };
}
