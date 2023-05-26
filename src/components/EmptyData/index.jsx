import { NoResultsIllustration, Placeholder } from "akeneo-design-system";

const EmptyData = ({ subTitle, customComponent, ...rest }) => {
  return (
    <>
      {!customComponent && (
        <Placeholder illustration={<NoResultsIllustration />} {...rest}>
          {subTitle}
        </Placeholder>
      )}
      {customComponent}
    </>
  );
};

export default EmptyData;
