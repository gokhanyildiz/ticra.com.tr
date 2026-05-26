const enabledValues = new Set(['1', 'true', 'yes', 'on']);

export function isMaintenanceModeEnabled() {
  const value = process.env.TICRA_MAINTENANCE_MODE?.trim().toLowerCase();

  return value ? enabledValues.has(value) : false;
}
