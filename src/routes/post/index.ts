import { t } from '../builder'

import { get_posts } from './get_posts'
// import { create_post } from './create_post'

export const postRouter = t.router({
  get_posts,
  // create_post,
})
