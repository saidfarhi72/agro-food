import { Form, Formik } from "formik";
import * as Yup from "yup";
import FormikInput from "../../Input";
import ImagePicker from "./ImagePicker";
import SubmitButton from "./SubmitButton";
import TextArea from "./TextArea";

export type CreationValues = {
  name: string;
  description: string;
  image?: File;
};



export const creationValidationSchema = Yup.object().shape({
  name: Yup.string().required("Must enter a name"),
  description: Yup.string().required("Must enter a description"),
  image: Yup.mixed().test("is_defined", "Must select an image", (value) =>
    Boolean(value)
  ),
});

const CreationForm = ({ onSubmit }) => {
  const initialValues: CreationValues = { name: "", description: "" };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={creationValidationSchema}
      validateOnBlur={false}
      validateOnChange={false}
      validateOnMount={false}
      onSubmit={onSubmit}
    >
      <Form className="">
        <div className="flex w-full justify-center items-center space-y-5  flex-col">
        <ImagePicker name="image" className="mr-4" />
          <FormikInput name="name" placeholder="name" />
          <TextArea name="description" placeholder="description..." />
          <SubmitButton />
        </div>
      </Form>
    </Formik>
  );
};

export default CreationForm;
