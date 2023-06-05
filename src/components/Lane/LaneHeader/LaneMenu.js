import React from 'react'

import {Popover} from 'react-popopo'

import {CustomPopoverContent, CustomPopoverContainer} from 'rt/styles/Base'

import {
  LaneMenuTitle,
  LaneMenuHeader,
  LaneMenuContent,
  DeleteWrapper,
  LaneMenuItem,
  GenDelButton,
  MenuButton
} from 'rt/styles/Elements'

const LaneMenu = ({t, onDelete}) => (
  <Popover
    position="bottom"
    PopoverContainer={CustomPopoverContainer}
    PopoverContent={CustomPopoverContent}
    trigger={<MenuButton>⋮</MenuButton>}>
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
)

export default LaneMenu
