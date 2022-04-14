
module.exports = mongooseConfig => {
    const mongooseModel = mongooseConfig.model(
        "stories",
        mongooseConfig.schema(
            {
                title: String,
                description: String
            },
            {
                timestamps:  true
            }
        )
    );
    return mongooseModel;
};
