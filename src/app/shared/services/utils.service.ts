import { Injectable } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import * as moment from 'moment';
import { DeviceDetectorService } from 'ngx-device-detector';
import { environment } from '../../../environments/environment.prod';

moment.defineLocale('pt-br', {
    relativeTime: {
        future: 'em %s',
        past: '%s atrás',
        s: 'segundos',
        m: 'um minuto',
        mm: '%d minutos',
        h: 'uma hora',
        hh: '%d horas',
        d: 'um dia',
        dd: '%d dias',
        M: 'um mês',
        MM: '%d meses',
        y: 'um ano',
        yy: '%d anos'
    }
});

type Base = (
    "year" | "years" | "y" |
    "month" | "months" | "M" |
    "week" | "weeks" | "w" |
    "day" | "days" | "d" |
    "hour" | "hours" | "h" |
    "minute" | "minutes" | "m" |
    "second" | "seconds" | "s" |
    "millisecond" | "milliseconds" | "ms"
);
@Injectable()
export class UtilsService {
    private readonly API = environment.API;

    constructor(
        private deviceService: DeviceDetectorService,
    ) { }

    getUrlAPI(): string {
        return this.API.replace('/api/', '/');
    }

    truncateDecimals(num, digits) {
        let numS = num.toString(),
            decPos = numS.indexOf('.'),
            substrLength = decPos == -1 ? numS.length : 1 + decPos + digits,
            trimmedResult = numS.substr(0, substrLength),
            finalResult = isNaN(trimmedResult) ? 0 : trimmedResult;

        return parseFloat(finalResult);
    }

    getLogoHubbi(): string {
        return "assets/images/hubbi.PNG";
    }

    date2str(date) {
        let data = new Date(date);
        data.setTime(data.getTime() + data.getTimezoneOffset() * 60 * 1000);

        let dia: string, mes: string, ano: string;
        dia = (data.getDate() < 10) ? "0" + data.getDate() : data.getDate().toString();
        mes = (data.getMonth() + 1 < 10) ? "0" + (data.getMonth() + 1) : (data.getMonth() + 1).toString();
        ano = data.getFullYear().toString();

        return dia + '/' + mes + '/' + ano;
    }

    str2Date(data: string): Date {
        try {
            if (data) {
                let aux = data.split("/");
                let dia = Number(aux[0]);
                let mes = Number(aux[1]);
                let ano = Number(aux[2]);

                if (!dia || !mes || !ano)
                    return null;
                else
                    return new Date(ano, mes - 1, dia); // coloca -3h: new Date(Date.UTC(ano, mes - 1, dia));
            } else return null;
        } catch (erro) {
            console.error(erro);
        }
    }

    /**
     * Retorna booleano se "data_ref" é anterior a "data".
     * @param data_ref data de referência
     * @param data data
     */
    isBefore(data_ref: string | number | Date | any[], data: string | number | Date | any[]): boolean {
        return moment(data_ref).isBefore(data);
    }

    /**
     * Retorna booleano se "data_ref" é após a "data".
     * @param data_ref data de referência
     * @param data data
     */
    isAfter(data_ref: string | number | Date | any[], data: string | number | Date | any[]): boolean {
        return moment(data_ref).isAfter(data);
    }

    /**
     * Retorna booleando se "data_ref" está entre as datas "inicio" e "fim".
     * @param data_ref data de referência
     * @param inicio data de início
     * @param fim data fim
     * @param options check documentação do MomentJS
     */
    isBetween(data_ref: string | number | Date | any[], inicio: string | number | Date | any[], fim: string | number | Date | any[], options?: any): boolean {
        return moment(data_ref, 'DD/MM/YYYY').isBetween(inicio, fim, null, options ? options : '[]');
    }

    /**
     * Retorna a subtração de "data_ref" com o "valor" informado.
     * @param data_ref data de referência
     * @param valor quantidade a ser subtraído
     * @param unidade unidade: days
     */
    subtractDate(data_ref: string | number | Date | any[], valor: any, unidade: Base = 'days'): string {
        return moment(data_ref, 'DD/MM/YYYY').subtract(valor, unidade).format('DD/MM/YYYY');
    }

    /**
     * Retorna a soma de "data_ref" com o "valor" informado.
     * @param data_ref data de referência
     * @param valor quantidade a ser somado
     * @param unidade unidade: days
     */
    addDate(data_ref: string | number | Date | any[], valor: any, unidade: Base = 'days'): string {
        return moment(data_ref, 'DD/MM/YYYY').add(valor, unidade).format('DD/MM/YYYY');
    }

    /** 
     * Retorna a quantidade de dias/anos/semanas/etc entre 'fim' e 'inicio'. (fim - inicio)
     * @param inicio Moment Date
     * @param fim Moment Date
     * @param unidade String 'days', 'months', 'years', etc
     */
    diffDates(inicio: moment.Moment | string | number | Date, fim: moment.Moment | string | number | Date, unidade: Base = 'days', precisao?: boolean): number {
        return moment(fim, 'DD/MM/YYYY').diff(moment(inicio, 'DD/MM/YYYY'), unidade, precisao);
    }

    /**
     * Retorna um array ordenado por data;
     * @param {Array} itens Array de itens a ser ordenado por data
     * @param {string} atributo Atributo da data
     */
    orderByDate(itens: any[], atributo: string, desc?: boolean): any[] {
        if (itens && !desc)
            return itens.sort((a, b) => new Date(b[atributo]).getTime() - new Date(a[atributo]).getTime());
        else if (itens && desc)
            return itens.sort((a, b) => new Date(a[atributo]).getTime() - new Date(b[atributo]).getTime());
    }

    detectDevice(): any {
        return this.deviceService.getDeviceInfo();
    }

    isMobile(): boolean {
        return this.deviceService.isMobile();
    }

    isTablet(): boolean {
        return this.deviceService.isTablet();
    }

    isDesktop(): boolean {
        return this.deviceService.isDesktop();
    }

    isDesktop2(): boolean {
        let innerWidth = window.innerWidth;
        if (innerWidth < 800) return false;
        else return true;
    }

    setPaginator(paginator: MatPaginator): MatPaginator {
        paginator._intl.itemsPerPageLabel = "Itens por página";
        paginator._intl.firstPageLabel = "Primeira página";
        paginator._intl.previousPageLabel = "Página anterior";
        paginator._intl.nextPageLabel = "Próxima página";
        paginator._intl.lastPageLabel = "Última página";
        return paginator;
    }

    noMask(valor): number {
        if (valor && typeof valor === 'number')
            return valor;
        else if (valor) {
            let split = valor.split("R$ ");
            let response = Number(split[1].replace('.', '').replace('.', '').replace('.', '').replace('.', '').replace(',', '.'));
            if (split[0] == '-')
                return valor ? -response : 0;
            else
                return valor ? response : 0;
        } else return 0;
    }

    getUrlFile(file): string {
        if (file && file.path) return this.API.replace('/api/', '/') + file.path.replace('./uploads/', '');
        else return file;
    }

    isStringBase64(str: string): boolean {
        try {
            return (str.split(";")[1].split(',')[0] === 'base64') ? true : false;
        } catch (e) {
            return false;
        }
    }

    dateIsValid(data: Date) {
        return moment(data).isValid();
    }

    isExpired(exp: number | string | Date, iat: boolean = false): boolean {
        if (iat) {
            let timeStamp = Math.floor(Date.now() / 1000);
            let timeCheck = Number(exp) - timeStamp;

            return (timeCheck < 0) ? true : false;
        } else {
            if (exp) return this.isAfter(moment().toString(), moment(exp).toString());
            else return true;
        }
    }
}


