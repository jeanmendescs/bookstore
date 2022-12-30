const yup = require("yup");
const { ObjectId } = require("mongodb");

yup.addMethod(yup.string, "mongoDBId", function (errorMessage) {
  return this.test("Invalid Id", errorMessage, function () {
    const { path, createError, parent } = this;

    const { id } = parent;
    return (
      !!ObjectId.isValid(id) || createError({ path, message: errorMessage })
    );
  });
});

const updateBookSchema = yup.object({
  body: yup
    .object({
      title: yup.string().optional(),
      author: yup.string().optional(),
      pages: yup.number().optional(),
      genres: yup.array().of(yup.string()),
      rating: yup.number().optional(),
      reviews: yup.array().of(
        yup
          .object({
            name: yup.string().required(),
            body: yup.string().required(),
          })
          .noUnknown()
          .strict()
      ),
    })
    .noUnknown()
    .strict(),
  params: yup.object({
    p: yup.number().optional(),
    id: yup.string().mongoDBId("Invalid Id").required(),
  }),
});

module.exports = {
  updateBookSchema,
};
