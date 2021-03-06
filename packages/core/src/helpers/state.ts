import {
  Column,
  ColumnCreation,
  ColumnSubscription,
  ColumnSubscriptionCreation,
} from '../types'
import { getUniqueIdForSubscription } from './github/shared'
import { guid } from './shared'

export function columnsArrToState(
  columns: ColumnCreation[],
  updatedAt?: string,
) {
  const items = columns || []
  const byId: Record<string, Column | undefined> = {}

  const allIds = items.map((column: ColumnCreation) => {
    const id = column.id || guid()

    byId[id] = {
      ...column,
      id,
      subscriptionIds: column.subscriptionIds || [],
      createdAt: column.createdAt || new Date().toISOString(),
      updatedAt: column.updatedAt || new Date().toISOString(),
    }

    return id
  })

  return { allIds, byId, updatedAt: updatedAt || new Date().toISOString() }
}

export function subscriptionsArrToState(
  subscriptions: ColumnSubscriptionCreation[],
  updatedAt?: string,
) {
  const items = subscriptions || []
  const byId: Record<string, ColumnSubscription | undefined> = {}
  const allIds = items.map((subscription: ColumnSubscriptionCreation) => {
    const id = subscription.id || getUniqueIdForSubscription(subscription)
    byId[id] = {
      ...subscription,
      id,
      data: subscription.data || {},
      createdAt: subscription.createdAt || new Date().toISOString(),
      updatedAt: subscription.updatedAt || new Date().toISOString(),
    } as ColumnSubscription

    return id
  })

  return { allIds, byId, updatedAt: updatedAt || new Date().toISOString() }
}
