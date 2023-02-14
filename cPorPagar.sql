CREATE TABLE public.cp_cabecera (
    id_cabecera character varying(50) NOT NULL,
    descripcion_pago character varying(50) NOT NULL,
    ruc_proveedor character varying(50) NOT NULL,
    cdgo_tipo_pago character varying(50) NOT NULL,
    fecha_pago date NOT NULL,
    total double precision NOT NULL
);

CREATE TABLE public.cp_detalle (
    id_detalle integer NOT NULL,
    id_cabecera character varying(50) NOT NULL,
    cantidad_a_pagar double precision NOT NULL,
    fcom_id character varying(13) NOT NULL
);


CREATE SEQUENCE public.cp_detalle_id_detalle_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.cp_detalle_id_detalle_seq OWNED BY public.cp_detalle.id_detalle;

CREATE TABLE public.cp_factura (
    fcom_id character varying(13) NOT NULL,
    pro_cedula_ruc character varying(50) NOT NULL,
    fcom_fecha date NOT NULL,
    fcom_credito_contado boolean NOT NULL,
    fcom_fechavencimiento date NOT NULL
);

CREATE TABLE public.cp_fuentes_pago (
    id_fuentes_pago integer NOT NULL,
    fp_descripcion character varying(50) NOT NULL,
    cdgo_tipo_pago character varying(50) NOT NULL,
    nro_cuenta_bancaria character varying(50) NOT NULL,
    estado boolean NOT NULL
);

CREATE SEQUENCE public.cp_fuentes_pago_id_fuentes_pago_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.cp_fuentes_pago_id_fuentes_pago_seq OWNED BY public.cp_fuentes_pago.id_fuentes_pago;

CREATE TABLE public.cp_proveedor (
    prov_cedula_ruc character varying(13) NOT NULL,
    pro_nombre character varying(50) NOT NULL,
    pro_direccion character varying(50) NOT NULL,
    pro_ciudad character varying(50) NOT NULL,
    pro_telefono character varying(13) NOT NULL,
    pro_correo character varying(30) NOT NULL,
    pro_credito_contado boolean NOT NULL,
    pro_estado boolean NOT NULL
);

CREATE TABLE public.cp_tipo_pago (
    cdgo_tipo_pago character varying(50) NOT NULL,
    tp_descripcion character varying(50) NOT NULL
);

ALTER TABLE ONLY public.cp_detalle ALTER COLUMN id_detalle SET DEFAULT nextval('public.cp_detalle_id_detalle_seq'::regclass);

ALTER TABLE ONLY public.cp_fuentes_pago ALTER COLUMN id_fuentes_pago SET DEFAULT nextval('public.cp_fuentes_pago_id_fuentes_pago_seq'::regclass);

SELECT pg_catalog.setval('public.cp_detalle_id_detalle_seq', 12, true);

SELECT pg_catalog.setval('public.cp_fuentes_pago_id_fuentes_pago_seq', 3, true);

ALTER TABLE ONLY public.cp_cabecera
    ADD CONSTRAINT pk_cabecera PRIMARY KEY (id_cabecera);

ALTER TABLE ONLY public.cp_detalle
    ADD CONSTRAINT pk_detalle PRIMARY KEY (id_detalle);

ALTER TABLE ONLY public.cp_factura
    ADD CONSTRAINT pk_factura PRIMARY KEY (fcom_id);

ALTER TABLE ONLY public.cp_fuentes_pago
    ADD CONSTRAINT pk_fuentes_pago PRIMARY KEY (id_fuentes_pago);

ALTER TABLE ONLY public.cp_proveedor
    ADD CONSTRAINT pk_proveedor PRIMARY KEY (prov_cedula_ruc);

ALTER TABLE ONLY public.cp_tipo_pago
    ADD CONSTRAINT pk_tipo_pago PRIMARY KEY (cdgo_tipo_pago);

CREATE INDEX fk_cabecera_prov ON public.cp_cabecera USING btree (ruc_proveedor);
CREATE INDEX fk_cabecera_tipo ON public.cp_cabecera USING btree (cdgo_tipo_pago);
CREATE INDEX fk_detale_cab ON public.cp_detalle USING btree (id_cabecera);
CREATE INDEX fk_fuentes_tipo ON public.cp_fuentes_pago USING btree (cdgo_tipo_pago);
ALTER TABLE ONLY public.cp_cabecera
    ADD CONSTRAINT fk_cabecera_proveedor FOREIGN KEY (ruc_proveedor) REFERENCES public.cp_proveedor(prov_cedula_ruc);
ALTER TABLE ONLY public.cp_cabecera
    ADD CONSTRAINT fk_cabecera_tpago FOREIGN KEY (cdgo_tipo_pago) REFERENCES public.cp_tipo_pago(cdgo_tipo_pago);
ALTER TABLE ONLY public.cp_detalle
    ADD CONSTRAINT fk_detalle_cabecera FOREIGN KEY (id_cabecera) REFERENCES public.cp_cabecera(id_cabecera);
ALTER TABLE ONLY public.cp_detalle
    ADD CONSTRAINT fk_detalle_factura FOREIGN KEY (fcom_id) REFERENCES public.cp_factura(fcom_id) NOT VALID;
ALTER TABLE ONLY public.cp_fuentes_pago
    ADD CONSTRAINT fk_tipo_fuentes_pago FOREIGN KEY (cdgo_tipo_pago) REFERENCES public.cp_tipo_pago(cdgo_tipo_pago);