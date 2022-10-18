using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace eAgenda.Infra.Orm.Migrations
{
    public partial class usuarioidemcategoria : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "UsuarioId",
                table: "TBCategoria",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_TBCategoria_UsuarioId",
                table: "TBCategoria",
                column: "UsuarioId");

            migrationBuilder.AddForeignKey(
                name: "FK_TBCategoria_AspNetUsers_UsuarioId",
                table: "TBCategoria",
                column: "UsuarioId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TBCategoria_AspNetUsers_UsuarioId",
                table: "TBCategoria");

            migrationBuilder.DropIndex(
                name: "IX_TBCategoria_UsuarioId",
                table: "TBCategoria");

            migrationBuilder.DropColumn(
                name: "UsuarioId",
                table: "TBCategoria");
        }
    }
}
