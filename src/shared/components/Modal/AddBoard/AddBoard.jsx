import axios from 'axios';
import {
  TitleHelp,
  StyledForm,
  FormField,
  InputField,
  SubmitButton,
  Row,
  RadioLabel,
  BackgroundIcon,
  IconContainer,
  Svg,
  BoardText,
  RadioField,
} from './AddBoard.styled';
import { Formik, Form } from 'formik';
import icon from '../../../images/icons.svg';

const BOARD_ICONS = [
  'icon-Project',
  'icon-star-04',
  'icon-loading-03',
  'icon-puzzle-piece-02',
  'icon-container',
  'icon-lightning-02',
  'icon-colors',
  'icon-hexagon-01',
];

function AddBoard({ onClose }) {
 const handleSubmit = async (values, { setSubmitting }) => {
  try {
    const token = localStorage.getItem('accessToken'); 
      const response = await axios.post("https://taskpro-backend-c73a.onrender.com/api/dashboard/", values, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (response.status === 201) {
      console.log("Доска создана");
      onClose();
    } else {
      console.error("Неожиданный ответ от сервера:", response);
    }
  } catch (error) {
    console.error("Ошибка при создании доски:", error);
  } finally {
    setSubmitting(false);
  }
};

  return (
    <>
      <TitleHelp>New board</TitleHelp>

      <Formik
        initialValues={{
          title: '',
          // background: 'empty',
          // icon: BOARD_ICONS[0],
        }}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, values, setFieldValue }) => (
          <Form>
            <FormField>
              <InputField autoFocus name="title" component="input" placeholder="Title" />
            </FormField>

            <BoardText>Icons</BoardText>
            <Row>
              {BOARD_ICONS.map(id => (
                <RadioLabel key={id} onClick={() => setFieldValue("icon", id)}>
                  <RadioField name="icon" type="radio" value={id} />
                  <IconContainer isSelected={values.icon === id}>
                    <Svg>
                      <use xlinkHref={`${icon}#${id}`} />
                    </Svg>
                  </IconContainer>
                </RadioLabel>
              ))}
            </Row>

            <BoardText>Background</BoardText>
            <Row>
              <RadioLabel onClick={() => setFieldValue("background", "empty")}>
                <RadioField name="background" type="radio" value="empty" />
                <BackgroundIcon src="https://res.cloudinary.com/doc0gvy9u/image/upload/v1693183018/block_fbhcsq.png" alt="Background Description" />
              </RadioLabel>
            </Row>

            <SubmitButton type="submit" disabled={isSubmitting}>Create</SubmitButton>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default AddBoard;