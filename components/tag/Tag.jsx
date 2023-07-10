const Tag = () => {
  const tagList = [
    "NextJS",
    "ReactJS",
    "HTML",
    "CSS",
    "JavaScript",
    "AWS",
    "Git",
    "NodeJS",
    "PowerBI",
    "SQL",
  ];
  return (
    <>
      {tagList.map((tag, i) => (
        <button className="resume-btn text-[15px]" key={i}>
          {tag}
        </button>
      ))}
    </>
  );
};

export default Tag;
