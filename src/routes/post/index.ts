import { t } from '../builder'
import { create_post } from './create_post'
import { get_posts } from './get_posts'

export const postRouter = t.router({
  create_post,
  get_posts,
})
