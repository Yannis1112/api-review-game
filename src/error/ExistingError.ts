export function ReviewFound(name: string): never {
    const error = new Error(name + " found so the console cannot be deleted");
    (error as any).status = 412;
    throw error;
  }