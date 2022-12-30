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

const getAllSchema = yup.object({
  query: yup.object({
    p: yup.number().min(0).optional(),
  }),
});

const bookIdSchema = yup.object({
  params: yup.object({
    id: yup.string().mongoDBId("Invalid Id").required(),
  }),
});

const createBookSchema = yup.object({
  body: yup
    .object({
      title: yup.string().required(),
      author: yup.string().required(),
      pages: yup.number().min(1).required(),
      genres: yup.array().of(yup.string()),
      rating: yup.number().min(0).max(10).required(),
      reviews: yup
        .array()
        .of(
          yup
            .object({
              name: yup.string().required(),
              body: yup.string().required(),
            })
            .noUnknown()
            .strict()
        )
        .min(1),
    })
    .noUnknown()
    .strict(),
});

const updateBookSchema = yup.object({
  body: yup
    .object({
      title: yup.string().optional(),
      author: yup.string().optional(),
      pages: yup.number().min(1).optional(),
      genres: yup.array().of(yup.string()),
      rating: yup.number().min(0).max(10).optional(),
      reviews: yup
        .array()
        .of(
          yup
            .object({
              name: yup.string().required(),
              body: yup.string().required(),
            })
            .noUnknown()
            .strict()
        )
        .min(1),
    })
    .noUnknown()
    .strict(),
  params: yup.object({
    id: yup.string().mongoDBId("Invalid Id").required(),
  }),
});

module.exports = {
  createBookSchema,
  getAllSchema,
  bookIdSchema: bookIdSchema,
  updateBookSchema,
};
