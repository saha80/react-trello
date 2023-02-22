import React from 'react';
import PropTypes from 'prop-types';

import { Popover } from 'react-popopo';

import { CustomPopoverContainer, CustomPopoverContent } from 'rt/styles/Base';

import {
  DeleteWrapper,
  GenDelButton,
  LaneMenuContent,
  LaneMenuHeader,
  LaneMenuItem,
  LaneMenuTitle,
  MenuButton,
} from 'rt/styles/Elements';

function LaneMenu({ t, onDelete }) {
  return (
    <Popover
      PopoverContainer={CustomPopoverContainer}
      PopoverContent={CustomPopoverContent}
      position="bottom"
      trigger={<MenuButton>⋮</MenuButton>}
    >
      <LaneMenuHeader>
        <LaneMenuTitle>{t('Lane actions')}</LaneMenuTitle>

        <DeleteWrapper>
          <GenDelButton>&#10006;</GenDelButton>
        </DeleteWrapper>
      </LaneMenuHeader>

      <LaneMenuContent>
        <LaneMenuItem onClick={onDelete}>{t('Delete lane')}</LaneMenuItem>
      </LaneMenuContent>
    </Popover>
  );
}

LaneMenu.propTypes = {
  onDelete: PropTypes.func,
  t: PropTypes.func,
};

export default LaneMenu;
