import Header from "./Header";
import Content from "./Content";
import Total from "./Total";
const Course = ({ course }) => {
  if (course.parts.length > 0) {
    return (
      <>
        <Header course={course.name} />
        <ul>
          {course.parts.map((part) => {
            return (
              <div key={part.id}>
                <Content part={part} />
              </div>
            );
          })}
        </ul>
        <Total parts={course.parts} />
      </>
    );
  } else {
    return (
      <>
        <Header course={course.name} />
        <div>This course has no part yet.</div>
      </>
    );
  }
};

export default Course;
