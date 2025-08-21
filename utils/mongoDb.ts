import { MongoClient } from 'mongodb';

const MONGO_URI = ''; // Change this
const DATABASE_NAME = '';

/**
 * Queries a MongoDB collection and returns a value.
 * @param collectionName - The MongoDB collection name.
 * @param filter - The query filter object.
 * @param field - The field to return.
 * @returns The value of the requested field from the first matching document.
 */
export async function queryMongoDB1( field: string): Promise<any> {
    const client = new MongoClient(MONGO_URI);
    const collectionName = "user";

    try {
        await client.connect();
        const database = client.db(DATABASE_NAME);
        const collection = database.collection(collectionName);

        // Execute the query
        const result = await collection.findOne({id:"" });
        const result2 =await collection.updateOne({id:"" },{$unset: {"packup":""}});
        

        if (!result || !(field in result)) {
            return null;
        }

        return result[field];
        
         // Return the requested field value
    } catch (error) {
        console.error('MongoDB query error:', error);
        throw error;
    } finally {
        await client.close();
    }
}
