import { get, put, post, del } from "./helpers/api";

export default {
  getList: async (resource, params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    const res = await get(resource)
      .query({ offset: (page - 1) * perPage, limit: perPage /* TODO: order */ })
      .authUser();
    return {
      data: res,
      total: 10 /* TODO: */,
    };
  },

  getOne: async (resource, params) => {
    const res = await get("$1/$2", resource, [params.id]).authUser();
    return { data: res };
  },

  getMany: async (resource, params) => {
    const res = await get("$1/$2", resource, params.ids).authUser();
    return { data: res };
  },

  getManyReference: async (resource, params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;

    const res = await get(resource)
      .query({
        offset: page * perPage,
        limit: perPage,
        filter: { [params.target]: params.id },
        /* TODO: order */
      })
      .authUser();
    return {
      data: res,
      total: 10 /* TODO: */,
    };
  },

  update: async (resource, params) => {
    const res = await put("$1/$2", resource, params.id)
      .authUser()
      .data(params.data);
    if (res === "ok") {
      return { data: params.data };
    }
    return false;
  },
  updateMany: async (resource, params) => {
    const res = await Promise.all(
      params.ids.map((id) =>
        put("$1/$2", resource, id).authUser().data(params.data[id])
      )
    );
    return res;
  },

  create: async (resource, params) => {
    const id = await post(resource).authUser().data(params.data);
    return { data: { ...params.data, id } };
  },

  delete: async (resource, params) => {
    await del("$1/$2", resource, [params.id]).authUser();
    return { data: { ...params.data } };
  },

  deleteMany: async (resource, params) => {
    await del("$1/$2", resource, [params.id]).authUser();
    return { data: { ...params.data } };
  },
};
