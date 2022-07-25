import { Interface, BaseClass, Property, CodeGenerator, Surrounding } from 'pont-engine';

export default class MyGenerator extends CodeGenerator {
  getInterfaceContentInDeclaration(inter: Interface) {
    const requestParams = inter.getRequestParams();
    let paramsCode = inter.getParamsCode('Params');

    return `
      export ${paramsCode}

      export type Response = ${inter.responseType}

      export const init: Response;

      export function request(${requestParams}): Promise<Response>;
    `;
  }

  getBaseClassInDeclaration(base: BaseClass) {
    const originProps = base.properties;

    base.properties = base.properties.map(prop => {
      return new Property({
        ...prop,
        required: false
      });
    });

    const result = super.getBaseClassInDeclaration(base);
    base.properties = originProps;

    return result;
  }

  getInterfaceContent(inter: Interface) {
    const method = inter.method.toUpperCase();
    let requestParams = inter.getRequestParams(this.surrounding);
    let paramsCode = inter.getParamsCode('Params', this.surrounding);
    paramsCode = paramsCode.replace('class', 'interface')

    if (method === 'POST') {
      const splitParams = requestParams.split(',')
      const [body, bodyType] = splitParams[1].split(': ')
      // splitParams[1] = [body, `InstanceType<typeof ${bodyType}>`].join(': ')
      splitParams[1] = [body, `InstanceType<any>`].join('?: ')
      requestParams = splitParams.join(',')
    }
    
    return `
    /**
     * @desc ${inter.description}
     */

    import * as defs from '../../baseClass';
    import { PontCore } from 'src/utils/pontCore';

    export ${paramsCode}
    export const init = ${inter.response.getInitialValue()};

    export function request(${requestParams}) {
      return PontCore.fetch("${inter.path}", params, "${method}", ${inter.getRequestContent()});
    }
   `;
  }
}
