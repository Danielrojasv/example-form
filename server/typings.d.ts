declare module '*.config.json' {
    export const server_port: number;
    export const server_host: string;
    export const mongo_db_host: string;
    export const mongo_db_port: number;
    export const mongo_db_name: string;
}

declare module 'gulp-clean';