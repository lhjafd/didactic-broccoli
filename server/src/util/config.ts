function required(key: string): string {
    const val = process.env[key];
    if (!val) throw new Error(`Missing env var: ${key}`);
    return val;
}

export const config = {
    port: Number(process.env.PORT ?? 3000),
    databasePort: Number(process.env.MYSQL_PORT ?? 3306),
    databaseName: required('MYSQL_DATABASE'),
    databaseUser: required('MYSQL_USER'),
    databasePassword: required('MYSQL_PASSWORD'),
    databaseUrl: required('DATABASE_URL'),
    jwtSecret: required('JWT_SECRET'),
}