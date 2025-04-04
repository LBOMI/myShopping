const STORAGE_KEY = "recent-platforms";

export function saveRecentPlatform(name: string) {
    const raw = localStorage.getItem(STORAGE_KEY);
    const list = raw ? JSON.parse(raw) : [];

    const filtered = list.filter((item: string) => item !== name);
    const newList = [name, ...filtered].slice(0, 5);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(newList));
}

export function loadRecentPlatforms(): string[] {
    if (typeof window === "undefined") return [];
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
}