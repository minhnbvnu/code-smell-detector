function createTableManager(dynamodb, table) {
  return {
    async exists() {
      let tables = await dynamodb.listTables().promise();
      return !!(tables.TableNames || []).includes(table);
    },
    async drop() {
      return dynamodb.deleteTable({ TableName: table }).promise();
    },
    async create(tableDefinition) {
      return dynamodb
        .createTable({ ...tableDefinition, TableName: table })
        .promise();
    },
  };
}