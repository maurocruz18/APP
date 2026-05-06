import { stringify } from 'query-string';
import { fetchUtils } from 'react-admin';
import type { DataProviderWithCustomMethods } from './types';

const _clear = (data: object, previous?: any): any => {
	return Object.fromEntries(
		Object.entries(data)
			.filter(([_, value]) => value !== null && value !== undefined)
			.map(([key, value]) => {
				if (typeof value !== 'object') {
					return [key, value];
				}

				if (Object.prototype.toString.call(value) === '[object Date]') {
					return [key, value.toISOString()];
				}

				if (Array.isArray(value)) {
					return [key, value];
				} else {
					return [key, _clear(value, previous?.[key])];
				}
			})
			.filter(
				([_, value]) =>
					!(typeof value === 'object' && Object.entries(value).length <= 0),
			),
	);
};

const lb4Provider = (
	apiUrl: string,
	aggregate = (_resource: string) => [] as object[],
	httpClient = fetchUtils.fetchJson,
): DataProviderWithCustomMethods => ({
	getEvery: async (resource: string, params: any) => {
		const aggregator = aggregate(resource);

		const query = stringify({
			filter: JSON.stringify({
				where: params.filter,
				limit: params.limit ? params.limit : undefined,
				order:
					!params.sort?.field || !params.sort?.order
						? undefined
						: [`${params.sort.field} ${params.sort.order}`],
				include:
					aggregator.length > 0
						? aggregator
						: params.meta?.include
							? params.meta.include
							: undefined,
				fields: params.meta?.fields ? params.meta.fields : {},
			}),
		});

		const result = await httpClient(`${apiUrl}/${resource}?${query}`, {
			method: 'GET',
			headers: new Headers({
				'X-Total': 'true',
				Accept: 'application/json',
				Authorization: `Bearer ${localStorage.getItem('token') ? localStorage.getItem('token') : ''}`,
			}),
		});

		return {
			data: result.json,
		};
	},
	getList: async (resource, params) => {
		const aggregator = aggregate(resource);

		const query = stringify({
			filter: JSON.stringify({
				where: params.filter,
				offset: params.pagination
					? (params.pagination.page - 1) * params.pagination.perPage
					: 0,
				limit: params.pagination ? params.pagination.perPage : 20,
				order: params.sort ? [`${params.sort.field} ${params.sort.order}`] : [],
				include:
					aggregator.length > 0
						? aggregator
						: params.meta?.include
							? params.meta.include
							: undefined,
				fields: params.meta?.fields ? params.meta.fields : {},
			}),
		});

		const result = await httpClient(
			params?.meta?.id
				? `${apiUrl}/${resource}/${params.meta.id}?${query}`
				: `${apiUrl}/${resource}?${query}`,
			{
				method: 'GET',
				headers: new Headers({
					'X-Total': 'true',
					Accept: 'application/json',
					Authorization: `Bearer ${localStorage.getItem('token') ? localStorage.getItem('token') : ''}`,
				}),
			},
		);

		return {
			data: result.json,
			total: parseInt(result.headers.get('x-total-count') || '0', 10),
		};
	},
	getOne: async (resource, params) => {
		const aggregator = aggregate(resource);

		const query = stringify({
			filter: JSON.stringify({
				include:
					aggregator.length > 0
						? aggregator
						: params.meta?.include
							? params.meta.include
							: undefined,
				fields: params.meta?.fields ? params.meta.fields : {},
			}),
		});

		const result = await httpClient(
			`${apiUrl}/${resource}/${params.id}?${query}`,
			{
				method: 'GET',
				headers: new Headers({
					Accept: 'application/json',
					Authorization: `Bearer ${localStorage.getItem('token') ? localStorage.getItem('token') : ''}`,
				}),
			},
		);

		return {
			data: result.json,
		};
	},
	getMany: async (resource, params) => {
		const aggregator = aggregate(resource);

		const query = stringify({
			filter: JSON.stringify({
				where: {
					id: { inq: params.ids },
				},
				include:
					aggregator.length > 0
						? aggregator
						: params.meta?.include
							? params.meta.include
							: undefined,
				fields: params.meta?.fields ? params.meta.fields : {},
			}),
		});

		const result = await httpClient(`${apiUrl}/${resource}?${query}`, {
			method: 'GET',
			headers: new Headers({
				Accept: 'application/json',
				Authorization: `Bearer ${localStorage.getItem('token') ? localStorage.getItem('token') : ''}`,
			}),
		});

		return {
			data: result.json,
		};
	},
	getManyReference: async (resource, params) => {
		const aggregator = aggregate(resource);

		const query = stringify({
			filter: JSON.stringify({
				where: { ...params.filter, [params.target]: params.id },
				offset: (params.pagination.page - 1) * params.pagination.perPage,
				limit: params.pagination.perPage,
				order: [`${params.sort.field} ${params.sort.order}`],
				include:
					aggregator.length > 0
						? aggregator
						: params.meta?.include
							? params.meta.include
							: undefined,
				fields: params.meta?.fields ? params.meta.fields : {},
			}),
		});

		const result = await httpClient(`${apiUrl}/${resource}?${query}`, {
			method: 'GET',
			headers: new Headers({
				'X-Total': 'true',
				Accept: 'application/json',
				Authorization: `Bearer ${localStorage.getItem('token') ? localStorage.getItem('token') : ''}`,
			}),
		});

		return {
			data: result.json,
			total: parseInt(result.headers.get('x-total-count') || '0', 10),
		};
	},
	create: async (resource, params) => {
		if (params.data.photo?.rawFile?.name) {
			params.data.photo = {
				data: await verifyFile(params.data.photo),
				name: params.data.photo.rawFile.name,
			};
		}

		if (params.data.imagem?.rawFile?.name) {
			params.data.imagem = {
				data: await verifyFile(params.data.imagem),
				name: params.data.imagem.rawFile.name,
			};
		}

		const result = await httpClient(`${apiUrl}/${resource}`, {
			method: 'POST',
			body: JSON.stringify(params.data),
			headers: new Headers({
				Accept: 'application/json',
				Authorization: `Bearer ${localStorage.getItem('token') ? localStorage.getItem('token') : ''}`,
			}),
		});

		return {
			data: result.json,
		};
	},
	update: async (resource, params) => {
		if (params.data.photo?.rawFile?.name) {
			//src é usado para verficar se a foto já existe ou não
			//no caso da a foto ser um blob:http:// é pq nao pertence
			params.data.photo = {
				data: await verifyFile(params.data.photo),
				name: params.data.photo.rawFile.name,
				src: params.data.photo.src,
			};
		}

		if (params.data.imagem?.rawFile?.name) {
			//src é usado para verficar se a foto já existe ou não
			//no caso da a foto ser um blob:http:// é pq nao pertence
			params.data.imagem = {
				data: await verifyFile(params.data.imagem),
				name: params.data.imagem.rawFile.name,
				src: params.data.imagem.src,
			};
		}

		const result = await httpClient(`${apiUrl}/${resource}/${params.id}`, {
			method: 'PATCH',
			body: JSON.stringify(params.data, params.previousData),
			headers: new Headers({
				Accept: 'application/json',
				Authorization: `Bearer ${localStorage.getItem('token') ? localStorage.getItem('token') : ''}`,
			}),
		});

		return {
			data: params.previousData
				? {
						...params.previousData,
						...params.data,
						...result.json,
					}
				: {
						...params.data,
						...result.json,
					},
		};
	},
	updateMany: async (resource, params) => {
		const query = stringify({
			filter: JSON.stringify({
				where: {
					id: { inq: params.ids },
				},
			}),
		});

		await httpClient(`${apiUrl}/${resource}?${query}`, {
			method: 'PATCH',
			body: JSON.stringify(params.data),
			headers: new Headers({
				Accept: 'application/json',
				Authorization: `Bearer ${localStorage.getItem('token') ? localStorage.getItem('token') : ''}`,
			}),
		});

		return {
			data: params.ids,
		};
	},
	delete: async (resource, params) => {
		await httpClient(`${apiUrl}/${resource}/${params.id}`, {
			method: 'DELETE',
			headers: new Headers({
				Accept: 'application/json',
				Authorization: `Bearer ${localStorage.getItem('token') ? localStorage.getItem('token') : ''}`,
			}),
		});

		return {
			data: params.previousData as any,
		};
	},
	deleteMany: async (resource, params) => {
		const query = stringify({
			filter: JSON.stringify({
				where: {
					id: { inq: params.ids },
				},
			}),
		});

		await httpClient(`${apiUrl}/${resource}?${query}`, {
			method: 'DELETE',
			headers: new Headers({
				Accept: 'application/json',
				Authorization: `Bearer ${localStorage.getItem('token') ? localStorage.getItem('token') : ''}`,
			}),
		});

		return {
			data: params.ids,
		};
	},
});

export default lb4Provider;

export async function verifyFile(file: object) {
	//objeto Blob
	/*params.data.photo.rawFile = {
        path: params.data.photo.rawFile.path,
        lastModified: params.data.photo.rawFile.lastModified,
        lastModifiedDate: params.data.photo.rawFile.lastModifiedDate,
        name: params.data.photo.rawFile.name,
        size: params.data.photo.rawFile.size,
        type: params.data.photo.rawFile.type,
      }*/

	return new Promise((resolve, reject) => {
		const types = ['image/png', 'image/jpeg', 'image/jpg'];

		//@ts-expect-error
		if (!types.includes(file.rawFile.type) || file.rawFile.size > 5000000) {
			reject(new DOMException('Problem parsing input file.'));
		}

		const fileReader = new FileReader();

		//@ts-expect-error
		fileReader.readAsDataURL(file.rawFile);

		fileReader.onloadend = function () {
			const base64Image: string | ArrayBuffer | null = this.result as string;
			const finalImage = base64Image.split(';base64,').pop();
			resolve(finalImage);
		};
	});
}

export async function verifyPDF(file: object) {
	//objeto Blob
	/*params.data.photo.rawFile = {
    path: params.data.photo.rawFile.path,
    lastModified: params.data.photo.rawFile.lastModified,
    lastModifiedDate: params.data.photo.rawFile.lastModifiedDate,
    name: params.data.photo.rawFile.name,
    size: params.data.photo.rawFile.size,
    type: params.data.photo.rawFile.type,
  }*/

	return new Promise((resolve, reject) => {
		const types = 'application/pdf';

		//@ts-expect-error
		if (!file.rawFile.type.includes(types) || file.rawFile.size > 6000000) {
			reject(new DOMException('Problem parsing input file.'));
		}

		const fileReader = new FileReader();

		//@ts-expect-error
		fileReader.readAsDataURL(file.rawFile);

		fileReader.onloadend = function () {
			const base64Image: string | ArrayBuffer | null = this.result as string;
			const finalImage = base64Image.split(';base64,').pop();
			resolve(finalImage);
		};
	});
}
