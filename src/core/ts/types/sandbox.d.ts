declare module "*.less" {
    const content: Record<string, string>;
    export default content;
}

declare module "*.svg" {
    const content: string;
    export default content;
}

interface EnvironmentConfiguration {
    httpURL: string;
    wsURL: string;
    token?: string;
    nickname?: string;
    avatarColour?: string;
}
