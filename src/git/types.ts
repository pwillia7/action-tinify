import {Context} from '@actions/github/lib/context'
import {PullRequestEvent, PushEvent} from '@octokit/webhooks-types'
import Image from '../image'

export const supportedEvents = ['push', 'pull_request', 'repository_dispatch'] as const

type SupportedEvent = typeof supportedEvents[number]

interface ContextBase<T> extends Context {
  eventName: SupportedEvent
  payload: T
}

interface ContextPush extends ContextBase<PushEvent> {
  eventName: 'push'
}

interface ContextPullRequest extends ContextBase<PullRequestEvent> {
  eventName: 'pull_request'
}

interface ContextPush extends ContextBase<RepositoryDispatchEvent> {
  eventName: 'repository_dispatch'
}

export type SupportedContext = ContextPush | ContextPullRequest | ContextRepositoryDispatch

export function isPushContext(
  context: SupportedContext
): context is ContextPush {
  return 'push' === context.eventName
}

export function isRepositoryDispatchContext(
  context: SupportedContext
): context is ContextPush {
  return 'repository_dispatch' === context.eventName
}

export function isPullRequestContext(
  context: SupportedContext
): context is ContextPullRequest {
  return 'pull_request' === context.eventName
}

export interface File {
  filename: string
  status: string
}

export interface Commit {
  files: Image[]
  userName: string
  userEmail: string
  message: string
}
