import React from 'react';
import { Link } from 'react-router-dom';
import Heading from './Heading';
import Button from './Button';

const EmptyState = ({
  icon: Icon,
  title,
  message,
  actionText,
  actionLink,
  onAction
}) => {
  return (
    <div className="container empty-state">
      {Icon && (
        <div className="empty-icon-wrapper">
          <Icon size={50} color="var(--primary)" />
        </div>
      )}
      <Heading level={2}>{title}</Heading>
      <p>{message}</p>

      {actionLink && actionText && (
        <Button as={Link} to={actionLink}>
          {actionText}
        </Button>
      )}

      {!actionLink && onAction && actionText && (
        <Button onClick={onAction}>
          {actionText}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
