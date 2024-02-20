async function getReferences(reference, filter={}) {
        let refTable = reference.model.table
        let referenceField = reference.referenceField;
        let join = [refTable];

        if (reference.direction === "from") {
            join.push(`${refTable}.${referenceField}`, `${Entity.table}.${Entity.primaryKey}`)
        }
        else if (reference.direction === "to") {
            join.push(`${refTable}.${reference.model.primaryKey}`, `${Entity.table}.${referenceField}`)
        }

        let results = await Entity.database(Entity.table)
            .select(`${Entity.table}.${Entity.primaryKey} as parent_key`, `${refTable}.*`)
            .leftJoin(...join).where(whereFilter(filter));
        return results.reduce((acc, row) => {
            let parent_key = row.parent_key;
            delete row.parent_key;
            if(row[reference.model.primaryKey]){
                acc[parent_key] = (acc[parent_key] || []).concat(row);
            }
            return acc;
        }, {})
    }