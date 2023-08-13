import { DataSource} from 'typeorm';

const dbConfig = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '22Maratonci14.',
    database: 'myDb'
});

export default dbConfig;

