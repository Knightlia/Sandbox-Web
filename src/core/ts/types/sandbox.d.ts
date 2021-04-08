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

interface NicknameResponse {
    status: boolean;
    nickname: string;
    message: string;
}

interface SandboxMessage {
    sender: string;
    message: string;
    time: number;
    avatarColour: string;
}
