import _ from 'lodash'
import React from 'react'

import { EventColumn } from '../components/columns/EventColumn'
import { NotificationColumn } from '../components/columns/NotificationColumn'
import { useColumn } from '../hooks/use-column'

export interface ColumnContainerProps {
  columnId: string
  pagingEnabled?: boolean
  swipeable?: boolean
}

export const ColumnContainer = React.memo((props: ColumnContainerProps) => {
  const { columnId, pagingEnabled, swipeable } = props

  const { column, columnIndex, subscriptions } = useColumn(columnId)

  if (!column) return null

  switch (column.type) {
    case 'activity': {
      return (
        <EventColumn
          key={`event-column-${column.id}`}
          column={column}
          columnIndex={columnIndex}
          pagingEnabled={pagingEnabled}
          subscriptions={subscriptions}
          swipeable={swipeable}
        />
      )
    }

    case 'notifications': {
      return (
        <NotificationColumn
          key={`notification-column-${column.id}`}
          column={column}
          columnIndex={columnIndex}
          pagingEnabled={pagingEnabled}
          subscriptions={subscriptions}
          swipeable={swipeable}
        />
      )
    }

    default: {
      console.error('Invalid Column type: ', (column as any).type)
      return null
    }
  }
})
