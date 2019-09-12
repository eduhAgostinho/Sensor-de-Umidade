export interface Subscription {
    endpoint: string,
    expirationTime?: number,
    keys: {
        auth: string,
        p256dh: string
    }
} 