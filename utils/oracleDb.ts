import oracledb from 'oracledb';

/**
 * Queries an Oracle database and returns a value.
 * @param query - The SQL query to execute.
 * @param params - Query parameters (optional).
 * @returns The first row's first column value, or null if no data is found.
 */
export async function queryDatabase(query: string, params: any[] = [], collectionName: string): Promise<any> {
    let connection: oracledb.Connection | undefined;
    let user;
    let password;
    let connectString;
    
    switch ( collectionName ) {
        case '':
            user='';
            password='';
            connectString='';
            break;
            
        case '':
            user='';
            password='';
            connectString='';
            break;
            
    }

    try {
        connection = await oracledb.getConnection({
            user: '',
            password: '',
            connectString: ''
        });

        const result = await connection.execute(query, params, { outFormat: oracledb.OUT_FORMAT_OBJECT });

        // Ensure rows exist and properly type it as an object array
        if (!result.rows || result.rows.length === 0) {
            return null;
        }

        // TypeScript Fix: Explicitly cast row to an object
        const row = result.rows[0] as Record<string, any>;

        return Object.values(row)[0]; // Return first column of the first row
    } catch (error) {
        console.error('Database query error:', error);
        throw error;
    } finally {
        if (connection) {
            await connection.close();
        }
    }
}
