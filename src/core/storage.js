const DEFAULT_SAVE_KEY = 'new-realtor-simulator/save-v1';
const DEFAULT_RECOVERY_KEY = 'new-realtor-simulator/recovery-v1';

export function createBrowserStorageAdapter(storage = globalThis.localStorage, keys = {}) {
  if (!storage) throw new Error('Browser storage is not available.');
  const saveKey = keys.saveKey ?? DEFAULT_SAVE_KEY;
  const recoveryKey = keys.recoveryKey ?? DEFAULT_RECOVERY_KEY;

  return {
    read() {
      return storage.getItem(saveKey) ?? storage.getItem(recoveryKey);
    },
    write(serialized) {
      storage.setItem(recoveryKey, serialized);
      storage.setItem(saveKey, serialized);
      storage.removeItem(recoveryKey);
    },
    clear() {
      storage.removeItem(saveKey);
      storage.removeItem(recoveryKey);
    },
    keys: { saveKey, recoveryKey },
  };
}

export function createMemoryStorageAdapter(initialSerialized = null) {
  let value = initialSerialized;
  return {
    read: () => value,
    write: (serialized) => { value = serialized; },
    clear: () => { value = null; },
    keys: { saveKey: 'memory/save', recoveryKey: 'memory/recovery' },
  };
}

export const SAVE_KEY = DEFAULT_SAVE_KEY;
export const RECOVERY_KEY = DEFAULT_RECOVERY_KEY;
