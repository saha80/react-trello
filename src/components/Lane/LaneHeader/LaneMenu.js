import React from 'react';
import PropTypes from 'prop-types';

import { Popover } from 'react-popopo';

import { CustomPopoverContent, CustomPopoverContainer } from 'rt/styles/Base';

import * as S from 'rt/styles/Elements';

const LaneMenu = ({ t, onDelete }) => (
  <Popover
    position="bottom"
    PopoverContainer={CustomPopoverContainer}
    PopoverContent={CustomPopoverContent}
    trigger={<S.MenuButton>⋮</S.MenuButton>}
  >
    <S.LaneMenuHeader>
      <S.LaneMenuTitle>{t('Lane actions')}</S.LaneMenuTitle>
      <S.DeleteWrapper>
        <S.GenDelButton>&#10006;</S.GenDelButton>
      </S.DeleteWrapper>
    </S.LaneMenuHeader>
    <S.LaneMenuContent>
      <S.LaneMenuItem onClick={onDelete}>{t('Delete lane')}</S.LaneMenuItem>
    </S.LaneMenuContent>
  </Popover>
);

LaneMenu.propTypes = {
  t: PropTypes.func,
  onDelete: PropTypes.func
};

export default LaneMenu;
