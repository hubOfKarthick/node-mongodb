
module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    {
      title: String,
      description: String,
      published: Boolean,
    },
    { timestamps: true }
  );
  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });
  const Stories = mongoose.model("stories", schema);
  return Stories;
};
// module.exports = mongooseConfig => {
//     const mongooseModel = mongooseConfig.model(
//         "stories",
//         mongooseConfig.Schema(
//             {
//                 title: String,
//                 description: String
//             },
//             {
//                 timestamps:  true
//             }
//         )
//     );
//     return mongooseModel;
// };
